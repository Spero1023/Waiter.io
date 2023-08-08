const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
//CASE SENSITIVE => Openai or OCR
export default async function accessSecret(secretid) {
    //choose which api key you want to use in secretid
    const client = new SecretManagerServiceClient();
    //path to secret
    const secretNew = `projects/379346806294/secrets/${secretid}/versions/latest`

    try {
        //version is the latest version with header containing path
        const [version] = await client.accessSecretVersion({
          name: secretNew,
        });
        //payload is converted to string. Do not put anything in quotes or save variables as keys.
        const secret = version.payload.data.toString();
        return secret;
      } catch (error) {
        console.error(`Failed to access secret: ${error}`);
        throw error;
      } 
}