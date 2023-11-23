
enum ProjectStack {
    node = "node",
    next = "next",
    php = "php",
    java = "java",
    android = "android",
    ios = "ios"
}

export const ensureAllowedStack = (projectStack: string) => {
    if (projectStack in ProjectStack)
        return ProjectStack[projectStack];

    return 'default';
}