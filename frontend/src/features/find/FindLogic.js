const Jimp = require('jimp');

// Function to calculate the dHash of an image
async function calculateDhash(imagePath) {
    try {
        const image = await Jimp.read(imagePath);
        const resizedImage = image.resize(9, 8).grayscale();
        let hash = '';

        for (let y = 0; y < resizedImage.bitmap.height; y++) {
            for (let x = 0; x < resizedImage.bitmap.width - 1; x++) {
                const pixelLeft = Jimp.intToRGBA(resizedImage.getPixelColor(x, y));
                const pixelRight = Jimp.intToRGBA(resizedImage.getPixelColor(x + 1, y));

                // Compare brightness values of adjacent pixels
                if (pixelLeft.r > pixelRight.r) {
                hash += '1';
                } else {
                hash += '0';
                }
            }
        }

        return hash;
    } catch (err) {
        console.error('Error during dHash calculation:', err);
        throw err;
    }
}

// Function to calculate Hamming distance between two hashes
function hammingDistance(hash1, hash2) {
    let distance = 0;

    for (let i = 0; i < hash1.length && i < hash2.length; i++) {
        if (hash1[i] !== hash2[i]) distance++;
    }

    return distance;
}

// Function to calculate the similarity score between two images
async function calculateImageSimilarity(targetImagePath, storedItemPhotos) {
    try {
        const targetHash = await calculateDhash(targetImagePath);
        const similarityThreshold = 0.8;
        const similarItems = [];

        for (const storedItemPhoto of storedItemPhotos) {
            const storedHash = await calculateDhash(storedItemPhoto.path);
            const distance = hammingDistance(targetHash, storedHash);
            
            // Normalize the distance to obtain the similarity score
            const maxDistance = targetHash.length;
            const similarityScore = 1 - distance / maxDistance;

            if (similarityScore >= similarityThreshold) {
                similarItems.push({
                storedItemReportId: storedItemPhoto.reportId,
                similarityScore,
                });
            }
        }

        return similarItems;
    } catch (err) {
        console.error('Error during image comparison:', err);
        throw err;
    }
}

// async function findSimilarItems(targetImagePath, storedItemPhotos) {
//     try {
//         const similarItems = [];
        
//         // Read the target image uploaded by the user
//         const targetHash = await calculateDhash(targetImagePath);
    
//         // Loop through the storedItemPhotos and compare each with the targetImage
//         for (const storedItemPhoto of storedItemPhotos) {
//             const storedHash = await calculateDhash(storedItemPhoto.path);
            
//             // Calculate Hamming distance between hashes
//             const distance = hammingDistance(targetHash, storedHash);
            
//             // Normalize distance to obtain similarity score
//             const maxDistance = targetHash.length;
//             const similarityScore = 1 - distance / maxDistance;
    
//             // Define a threshold value to determine similarity
//             const similarityThreshold = 0.8;
    
//             if (similarityScore >= similarityThreshold) {
//                 similarItems.push({
//                     storedItemReportId: storedItemPhoto.reportId,
//                     similarityScore: Math.round(similarityScore * 100) / 100,
//                 });
//             }
//         }
    
//         return similarItems;
//     } catch (err) {
//         console.error('Error during image comparison:', err);
//         return [];
//     }
// }