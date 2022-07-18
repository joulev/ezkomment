/**
 * We will support `GET` and `PUT` requests for customisation files
 * We will store the configuration in a subcollection?
 */
import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import { SITES_COLLECTION } from "~/server/firebase/firestoreCollections";
import { getSiteInTransaction } from "~/server/utils/firestoreUtils";

import { SiteCustomisation, UpdateSiteCustomisationBodyParams } from "~/types/server";

import html from "~/constants/sampleCommentCode";

/**
 * The id associated with the customisation document.
 */
const CUSTOMISATION_ID = "CUSTOMISATION_ID";

export async function getSiteCustomisation(siteId: string): Promise<SiteCustomisation> {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        const customisationSnapshot = await t.get(
            siteRef.collection("customisation").doc(CUSTOMISATION_ID)
        );
        return customisationSnapshot.exists
            ? (customisationSnapshot.data() as SiteCustomisation)
            : { customisation: html };
    });
}

export async function updateSiteCustomisation(
    uid: string,
    siteId: string,
    data: UpdateSiteCustomisationBodyParams
) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        await getSiteInTransaction(t, siteRef, uid);
        // Completely replace the customisation. If the document does not exists, it will
        // be created.
        t.set(siteRef.collection("customisation").doc(CUSTOMISATION_ID), data);
    });
}
