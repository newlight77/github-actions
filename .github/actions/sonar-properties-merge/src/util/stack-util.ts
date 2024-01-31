enum ProjectStack {
    android = "android",
    ios = "ios",
    java = "java",
    next = "next",
    node = "node",
    php = "php",
    react = "react"
}

export const ensureAllowedStack = (projectStack: string) => {

    if (projectStack in ProjectStack)
        return ProjectStack[projectStack];

    return 'default';
}
