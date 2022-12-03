import {createMedia} from "@artsy/fresnel"
import {breakpoints} from "./css-vars";

const MediaResults    = createMedia({breakpoints});

export const mediaStyle                    = MediaResults.createMediaStyle();
export const {Media, MediaContextProvider} = MediaResults;
