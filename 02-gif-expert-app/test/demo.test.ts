describe('Test demo', function () {

  test('should be equal', () => {
    const msg = 'Hello World'
    const msg2 = `Hello World`
    expect(msg).toBe(msg2)
  })

})
