export type DocsData = {
    title: string;
    content: string;
    lastModified: string;
};

export type SectionData = {
    sectionTitle: string;
    pages: {
        [key: string]: string; // we only go one level deep, and that's intentional
    };
};

export type NavData = {
    [key: string]: string | SectionData;
};
