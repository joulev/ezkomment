/**
 * We will support `GET` and `PUT` requests for customisation files
 * We will store the configuration in a subcollection?
 */
import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import { SITES_COLLECTION } from "~/server/firebase/firestoreCollections";

import { SiteCustomisation, UpdateSiteCustomisationBodyParams } from "~/types/server";

import CustomApiError from "../errors/customApiError";
import { handleFirestoreError } from "../errors/handleFirestoreError";
import { getSiteOrThrowInTransaction } from "./siteUtils";

/**
 * The id associated with the customisation document.
 */
const CUSTOMISATION_ID = "CUSTOMISATION_ID";

export async function getSiteCustomisation(uid: string, siteId: string) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        /**
         * Check whether the decoded uid match the site's uid.
         */
        await getSiteOrThrowInTransaction(t, uid, siteRef);
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
            await getSiteOrThrowInTransaction(t, uid, siteRef);
            t.update(siteRef.collection("customisation").doc(CUSTOMISATION_ID), data);
        })
        .catch(handleFirestoreError);
}
