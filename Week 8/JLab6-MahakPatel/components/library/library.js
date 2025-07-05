import { JSDOM } from "jsdom";

let xml;

async function loadXml() {
  if (!xml) {
    const response = await fetch("http://localhost:3000/library-data.kml", {
      headers: { "Content-Type": "application/xml" }
    });
    const dom = new JSDOM(await response.text(), { contentType: "application/xml" });
    xml = dom.window.document;
  }
  return xml;
}

async function loadLibraries() {
  const xmlDoc = await loadXml();
  return xmlDoc.querySelectorAll("Placemark");
}

async function getLibraryById(id) {
  const xmlDoc = await loadXml();
  return xmlDoc.getElementById(id);
}

export default {
  loadLibraries,
  getLibraryById
};