import { describe, expect, it } from "vitest"
import { decrypt, encrypt } from "~/index"

// Mock secret key and data for testing purposes
const secretKey = "testSecretKey1234567890"
const originalData = "This is a test string."

describe("AES-256-GCM Encryption and Decryption", () => {
    it("should use default base64 encoding", () => {
        const encryptedData = encrypt(originalData, secretKey)
        const decryptedData = decrypt(encryptedData, secretKey)

        expect(decryptedData).toBe(originalData)
    })

    it("should handle json data", () => {
        const userData = { name: "John Doe", email: "john@doe.com" }

        const encryptedData = encrypt(JSON.stringify(userData), secretKey)
        const decryptedData = decrypt(encryptedData, secretKey)

        expect(JSON.parse(decryptedData)).toStrictEqual(userData)
    })

    it("should encrypt and decrypt data correctly, returning the original data", () => {
        const encryptedData = encrypt(originalData, secretKey, { encoding: "base64" })
        const decryptedData = decrypt(encryptedData, secretKey)

        expect(decryptedData).toBe(originalData)
    })

    it("should have different lengths if encoding is different", () => {
        const encryptedDataBase64 = encrypt(originalData, secretKey, { encoding: "base64" })
        const encryptedDataHex = encrypt(originalData, secretKey, { encoding: "hex" })
        const encryptedDataLatin1 = encrypt(originalData, secretKey, { encoding: "latin1" })

        // check that base64 encoding has different length than hex encoding
        expect(encryptedDataBase64.length).not.toBe(encryptedDataHex.length)
        expect(encryptedDataBase64.length).not.toBe(encryptedDataLatin1.length)
        expect(encryptedDataHex.length).not.toBe(encryptedDataLatin1.length)
    })

    it("should throw an error if data or secretKey are invalid on encryption", () => {
        const badDataCall = () => encrypt("", secretKey, { encoding: "base64" })
        const badKeyCall = () => encrypt(originalData, "", { encoding: "base64" })

        expect(badDataCall).toThrow("[symmetrical-encryption] data and secretKey must be non-empty strings")
        expect(badKeyCall).toThrow("[symmetrical-encryption] data and secretKey must be non-empty strings")
    })

    it("should throw an error if encrypted data or secretKey are invalid on decryption", () => {
        const badDataCall = () => decrypt("", secretKey)
        const badKeyCall = () => decrypt(encrypt(originalData, secretKey, { encoding: "base64" }), "")

        expect(badDataCall).toThrowError() // Adjust based on your specific error handling
        expect(badKeyCall).toThrowError() // Adjust based on your specific error handling
    })
})
