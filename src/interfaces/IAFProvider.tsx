import AF from "../classes/AF";

export default interface IAFProvider {
    afState:AF | null,
    saveAF: (af: AF) => void;
}