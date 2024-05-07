const formatName = name => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase()
}

const formatNumber = (nb, divisor = 1) => {
    let nbX10 = nb * 10
    nbX10 = nbX10 / divisor
    
    return Math.trunc((nbX10 / 10) * 100) / 100
}

export { formatName, formatNumber }