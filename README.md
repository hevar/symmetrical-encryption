<h1 align="center" style="border-bottom: none;">Secure Symmetrical AES-256-GCM Encryption</h1>
<h5 align="center">Super simple and secure way to encrypt and decrypt data using the AES-256-GCM algorithm in Node.js. It leverages the crypto module to automatically manage cryptographic salts, initialization vectors (IVs), and keys. Ideal for applications requiring secure data storage or transmission.</h5>
<br />
<p align="center">
  <a href="https://github.com/hevar/symmetrical-encryption/actions/workflows/publish.yml">
    <img alt="Build states" src="https://github.com/hevar/symmetrical-encryption/actions/workflows/publish.yml/badge.svg?branch=master">
  </a>

    


  <p align="center">
    <a href="https://github.com/hevar/symmetrical-encryption/issues/new?template=bug_report.md">Bug report</a>
    ·
    <a href="https://github.com/hevar/symmetrical-encryption/issues/new?template=feature_request.md">Feature request</a>
  </p>
</p>
<br />
<hr />

## Features

AES-256-GCM encryption for high security
Automatic salt and IV generation for each encryption operation
Key derivation using scrypt for added security against brute-force attacks
Customizable encoding for encrypted output
Easy-to-use API for encrypting and decrypting strings

## Installation

```zsh
npm install symmetrical-encryption
```

or:

```zsh
yarn add symmetrical-encryption
```

or:

```zsh
pnpm add symmetrical-encryption
```

or:

```zsh
bun install symmetrical-encryption
```

## Usage

**Encrypting Data**

To encrypt data, provide the plaintext string, your secret key, and optionally specify the output encoding (defaults to Base64).

```ts
import { encrypt } from "symmetrical-encryption"

// Prefferably stored more securely; const secretKey = process.env.SECRET_KEY
const secretKey = "your-very-secure-secret-key"

const data = "Hi mom!"

const encryptedData = encrypt(data, secretKey, { encoding: "base64" }) // option object is optional
console.log("Encrypted Data:", encryptedData) // base64 encoded string
```

**Decrypting Data**

To decrypt data, provide the encrypted string and your secret key. The function automatically extracts the salt, IV, and authentication tag from the encrypted data.

```ts
import { decrypt } from "symmetrical-encryption"

// Prefferably stored more securely; const secretKey = process.env.SECRET_KEY
const secretKey = "your-very-secure-secret-key"

const encryptedData = "..." // The output from the encrypt function

const decryptedData = decrypt(encryptedData, secretKey)
console.log("Decrypted Data:", decryptedData) // "Hi mom!"
```

### Note

**Valid encoding options are:**

```ts
type ValidEncodings = "hex" | "base64" | "latin1"
```

## License
MIT

## Creating new releases
- `npx changeset`
- `npx changeset version`
- commit changes to master - it will automatically create a new tag, changelog, and publish to npm

