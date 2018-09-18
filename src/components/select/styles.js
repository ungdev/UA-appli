module.exports = {
  option: (base, { isSelected, isDisabled }) => {
    const styles = Object.assign({}, base)

    styles.fontSize = '16px'
    styles.color = isSelected ? '#fff'
      : isDisabled ? '#666'
      : '#222'

    if (isDisabled) {
      styles.backgroundColor = '#f0f0f0'
    }

    return styles
  },
  indicatorSeparator: base => ({
    display: 'none'
  }),
  menu: base => ({
    ...base,
    maxWidth: '200px'
  }),
  control: base => ({
    ...base,
    maxWidth: '200px',
    fontSize: '16px'
  }),
  container: base => ({
    ...base,
    margin: '12px 0'
  })
}
