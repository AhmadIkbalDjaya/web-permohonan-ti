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
