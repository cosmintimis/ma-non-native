import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export async function loadImageAsUint8Array(filePath: string): Promise<Uint8Array> {
    try {
        // Read the file as a base64 string
        const base64String = await FileSystem.readAsStringAsync(filePath, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Convert the base64 string to a Uint8Array
        const binaryString = atob(base64String);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }

        return byteArray;
    } catch (error) {
        console.error('Error loading image:', error);
        throw error;
    }
}

export async function loadStoredImage(assetModule: number): Promise<Uint8Array> {
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync(); 

    return loadImageAsUint8Array(asset.localUri!);
}
