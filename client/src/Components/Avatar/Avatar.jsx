import React from 'react'

function Avatar({
    children,
    backgroundColor,
    px,
    py,
    color,
    borderRadius,
    fontSize,
    cursor
}) {

    const style = {
        backgroundColor,
        padding : `${py} ${px}`,
        color : color || "black",
        borderRadius,
        fontSize,
        textAlign : "center",
        cursor : cursor || null,
        TextDecoration : "none"
    }

    return (
        <div style={style}>{children}</div>
    )
}

export default Avatar