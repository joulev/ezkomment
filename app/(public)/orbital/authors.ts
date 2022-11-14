export type Author = {
    name: string;
    github?: string;
};

const authors: { [key: string]: Author } = {
    joulev: {
        name: "Vu Van Dung",
        github: "joulev",
    },
    vietanh: {
        name: "Nguyen Viet Anh",
        github: "VietAnh1010",
    },
};

export default authors;
