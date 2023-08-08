const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

export default async function accessSecret(secretid) {
    const client = new SecretManagerServiceClient();
    const secretNew = `projects/379346806294/secrets/${secretid}/versions/latest`

    try {
        const [version] = await client.accessSecretVersion({
          name: secretNew,
        });
        const secret = version.payload.data.toString();
        return secret;
      } catch (error) {
        console.error(`Failed to access secret: ${error}`);
        throw error;
      } 
}