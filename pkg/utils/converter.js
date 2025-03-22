import * as shapefile from 'shapefile'
import zlib from 'zlib'
import shpjs from 'shpjs'
// const shpjs = require(shpjs)
// import { parseZip } from 'shpjs';
// import shp2json from 'shp2json'

export const convertBufferShapefileToGeoJSON = (buff) => new Promise(async (res, rej) => {
    try {
        const geoJSON = { type: 'FeatureCollection', features: [] };
        let source = await shapefile.open(buff)

        while (true) {
            const result = await source.read();
            if (result.done) break;

            const feature = {
                type: 'Feature',
                properties: result.value.properties,
                geometry: result.value.geometry
            };

            geoJSON.features.push(feature);
        }
        res(geoJSON)
    } catch (error) {
        rej(error)
    }
})

// Function to unzip a buffer
export function unzipBuffer(buffer) {
    return new Promise((resolve, reject) => {
        zlib.gunzip(buffer, (error, unzippedBuffer) => {
            if (error) {
                reject(error);
            } else {
                let result = JSON.parse(unzippedBuffer.toString());
                // resolve(unzippedBuffer);
                resolve(result);
            }
        });
    });
}

export const convertBufferZippedShapefileToGeoJSON = (buff) => new Promise(async (res, rej) => {
    try {
        // // Unzip the shapefile buffer
        // console.log("unzip");
        // const unzippedBuffer = await unzipBuffer(buff);
        // console.log("read");
        // const features = await shapefile.read(unzippedBuffer);

        // res({
        //     type: 'FeatureCollection',
        //     features: features
        // });
        let result = await shpjs(buff)
        res(result)
    } catch (error) {
        rej(error)
    }
})


export const convertBase64ToGeoJSON = async (base64) => {
    try {
        const str = Buffer.from(base64, 'base64').toString();
        let geo = JSON.parse(str)
        return geo
    } catch (error) {
        throw new Error(`failed convert shapefile into geojson: ${error}`)
    }
}