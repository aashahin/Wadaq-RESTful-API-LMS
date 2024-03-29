exports.sanitizeUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
};
exports.sanitizeInfo = (admin) => {
  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    avatar: admin.avatar,
    isAccountVerified: admin.isAccountVerified,
    academicTerms: admin.academicTerms,
    academicYears: admin.academicYears,
    classLevels: admin.classLevels,
    programs: admin.programs,
    yearGroups: admin.yearGroups,
    teachers: admin.teachers,
    students: admin.students,
  };
};
exports.sanitizeProfile = (data, name, email, avatar) => {
  return {
    name: name || data.name,
    email: email || data.email,
    avatar: avatar || data.avatar,
  };
};
