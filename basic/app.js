Handsfree.use('emojify', (pointer, instance) => {
    let emoji = '😐'
    let isFlipped = false

    // Instance.head.state contains a list of activated morphs
    // We just map it to a shorthand here so we don't have to type it all out each time
    let state = head.state

    // Let's start with some easy ones
    if (state.mouthOpen) emoji = '😃'
    if (state.browsUp) emoji = '🙄'
    if (state.smile) emoji = '🙂'

    // Some emojis can be made by combining activations
    if (state.eyesClosed && state.pursed) emoji = '😙'
    if (state.mouthOpen && state.eyesClosed && state.browsUp) emoji = '😂'
    if (!state.mouthClosed && state.pursed && state.browsUp) emoji = '😲'

    // Here we flip the emoji if the user smirks the other way
    // A smirk happens if and only if a user smiles to one side
    if (state.smirk && state.browsUp) {
      if (state.smileLeft) isFlipped = true
      emoji = '😏'
    }

    // Aplly transforms
    $emoji.style.transform = `perspective(1000px)
          rotateX(${-head.rotation[0]}rad)
          rotateY(${head.rotation[1]}rad)
          rotateZ(${-head.rotation[2]}rad)
          scale(${isFlipped ? -1 : 1}, 1)`

    // Show the emoji
    $emoji.innerText = emoji
  })

  