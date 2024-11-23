import { exportPKCS8, exportSPKI, generateKeyPair } from "jose";
import { existsSync, mkdirSync, writeFileSync } from "fs";

{
  // Generate the key pair
  const { publicKey, privateKey } = await generateKeyPair("RS256");

  // Export the keys to PEM format
  const publicKeyPEM = await exportSPKI(publicKey);
  const privateKeyPEM = await exportPKCS8(privateKey);

  // Ensure the keys directory exists, create it if it doesn't
  const keysDir = "./keys";
  if (!existsSync(keysDir)) {
    console.log("Creating keys directory...");
    mkdirSync(keysDir);
  }

  // Save to disk
  writeFileSync("./keys/public.pem", publicKeyPEM);
  writeFileSync("./keys/private.pem", privateKeyPEM);

  console.log("Keys generated and saved to ./keys directory");
}
