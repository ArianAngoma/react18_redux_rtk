describe('Tests in <DemoComponent/>', () => {
  test('This is a demo test', () => {
    // 1. Initialize
    const message1 = 'Hello World'

    // 2. Stimulus
    const message2 = message1.trim()

    // 3. Observe behavior
    expect(message1).toBe(message2)
  })
})


