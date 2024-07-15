export const convertGenderToID = (gender) => {
    return gender ? (gender == "male" ? "Laki-Laki" : "Perempuan") : "-";
};

export const convertRoleToID = (role) => {
    if (role) {
        if (role == "head") {
            role = "Kepala Jurusan";
        } else if (role == "secretary") {
            role = "Sekertars Jurusan";
        } else if (role == "staff") {
            role = "Staff";
        } else {
            role = "Dosen";
        }
        return role;
    }
    return "-";
};

export const convertRequestTypeToID = (string) => {
    if (string == "result") {
        return "Hasil";
    } else if (string == "comprehensive") {
        return "Kompren";
    } else if (string == "ppl") {
        return "PPL";
    }
    return "Proposal";
};
