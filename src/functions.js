const formatName = name => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase()
}

const formatNumber = (nb, divisor = 1) => {
    return Math.trunc((nb / divisor) * 100) / 100
}

export { formatName, formatNumber }