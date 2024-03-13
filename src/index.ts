import crypto from "crypto"

export type ValidEncodings = "hex" | "base64" | "latin1"

//test

const algorithm = "aes-256-gcm"
const tagLength = 16 // Authentication tag length in bytes
const defaultEncoding: ValidEncodings = "base64"
const ivLength = 16 // AES block size in bytes for GCM mode
const saltLength = 64 // Length of the salt in bytes
const keyLength = 32 // Length of the key in bytes (for aes-256-gcm)
const encodingSeparator = ":" // Separator for encoding and encrypted data

export const encrypt = (data: string, secretKey: string, options?: { encoding: ValidEncodings }): string => {
    if (!data || typeof data !== "string" || !secretKey || typeof secretKey !== "string") {
        throw new Error("[symmetrical-encryption] data and secretKey must be non-empty strings")
    }
    const encoding = options?.encoding ?? defaultEncoding

    const iv = crypto.randomBytes(ivLength)
    const salt = crypto.randomBytes(saltLength) // Generate a random salt
    const key = crypto.scryptSync(secretKey, salt, keyLength) // Derive a key from the secret and the salt
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    const encryptedText = Buffer.concat([cipher.update(data, "utf8"), cipher.final()])
    const authTag = cipher.getAuthTag()
    // Prepend the salt, IV, and authTag to the encrypted data for use in decryption
    const result = Buffer.concat([salt, iv, authTag, encryptedText]).toString(encoding)

    return `${encoding}${encodingSeparator}${result}`
}

export const decrypt = (data: string, secretKey: string): string => {
    if (!data || typeof data !== "string" || !secretKey || typeof secretKey !== "string") {
        throw new Error("[symmetrical-encryption] data and secretKey must be non-empty strings")
    }

    const encodingIndex = data.indexOf(encodingSeparator)
    const encoding = data.substring(0, encodingIndex) as ValidEncodings
    const encryptedData = data.substring(encodingIndex + 1)

    const rawData = Buffer.from(encryptedData, encoding)
    const salt = rawData.subarray(0, saltLength)
    const iv = rawData.subarray(saltLength, saltLength + ivLength)
    const authTagIndex = saltLength + ivLength
    const authTag = rawData.subarray(authTagIndex, authTagIndex + tagLength)
    const encryptedText = rawData.subarray(authTagIndex + tagLength)
    const key = crypto.scryptSync(secretKey, salt, keyLength)
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    decipher.setAuthTag(authTag)

    return decipher.update(encryptedText) + decipher.final("utf8")
}
