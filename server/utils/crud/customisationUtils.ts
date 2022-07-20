/**
 * We will support `GET` and `PUT` requests for customisation files
 * We will store the configuration in a subcollection?
 */
import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import { SITES_COLLECTION } from "~/server/firebase/firestoreCollections";
import CustomApiError from "~/server/utils/errors/customApiError";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import { getSiteInTransaction } from "~/server/utils/firestoreUtils";

import { SiteCustomisation, UpdateSiteCustomisationBodyParams } from "~/types/server";

/**
 * The id associated with the customisation document.
 */
const CUSTOMISATION_ID = "CUSTOMISATION";

export async function getSiteCustomisation(uid: string, siteId: string) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        /**
         * Check whether the decoded uid match the site's uid.
         */
        await getSiteInTransaction(t, siteRef, uid);
        const customisationSnapshot = await t.get(
            siteRef.collection("customisation").doc(CUSTOMISATION_ID)
        );
        if (!customisationSnapshot.exists)
            throw new CustomApiError("Customisation does not exist", 404);
        return customisationSnapshot.data() as SiteCustomisation;
    });
}

export async function updateSiteCustomisation(
    uid: string,
    siteId: string,
    data: UpdateSiteCustomisationBodyParams
) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin
        .runTransaction(async t => {
            await getSiteInTransaction(t, siteRef, uid);
            t.update(siteRef.collection("customisation").doc(CUSTOMISATION_ID), data);
        })
        .catch(handleFirestoreError); // In case the update fails. But it should not fail.
}
