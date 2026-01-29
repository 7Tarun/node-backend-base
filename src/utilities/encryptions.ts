import { compare, genSaltSync, hashSync } from "bcryptjs";

const { SALT_LENGTH } = process.env;

export class EncryptionService {
  private saltLength: number;

  constructor() {
    if (!SALT_LENGTH || isNaN(Number(SALT_LENGTH))) {
      throw new Error("Invalid SALT_LENGTH value");
    }
    this.saltLength = Number(SALT_LENGTH);
  }

  // Method to generate salt
  public getSalt(): string {
    return genSaltSync(this.saltLength);
  }

  // Method to encrypt data with a provided or generated salt
  public encrypt(data: string, salt?: string): string {
    if (!data) {
      throw new Error("Data to encrypt is required");
    }

    if (!salt) {
      salt = this.getSalt();
    }

    return hashSync(data, salt);
  }

  // Method to compare original data with the hashed data
  public async compareHash(
    originalData: string,
    hashData: string,
  ): Promise<boolean> {
    try {
      return await compare(originalData, hashData);
    } catch (error: any) {
      throw new Error(`Hash comparison failed: ${error.message}`);
    }
  }
}
