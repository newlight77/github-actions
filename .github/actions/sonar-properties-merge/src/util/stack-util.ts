enum ProjectStack {
    next = "next",
    node = "node",
    react = "react"
}

export const ensureAllowedStack = (projectStack: string) => {

    if (projectStack in ProjectStack)
        return ProjectStack[projectStack];

    return 'default';
}
