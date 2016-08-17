/** Created by hhj on 2/16/16. */
import { expect } from 'chai'

import { find, mark } from '../longestSubstring'

describe('lib longestSubstring', () => {

  it('should find longest substring', () => {
    const common = find('slananynka do zeli', '____nany____')
    expect(common.sequence).to.equal('nany')
    expect(common.offset1).to.equal(3)
    expect(common.offset2).to.equal(4)
    expect(common.length).to.equal(4)
    expect(common.length2).to.equal(4)
    expect(common.length2).to.equal(4)
  })

  it('should mark substring case 01', () => {
    const marked = mark('1 2 3 4 5 slovo 456', '7 7 7 7 jine "slovo" 888')
    expect(marked.marked1).to.equal('1 2 3 4 5 <b>slovo</b> 456')
    expect(marked.marked2).to.equal('7 7 7 7 jine "<b>slovo</b>" 888')
  })

  it('should mark substring case 02', () => {
    const marked = mark('[SUMMITD] Kladno Kozovka-Kokos', 'Brno-Brno-mesto, Kozi 27/2 "BMKOZ"')
    expect(marked.marked1).to.equal('[SUMMITD] Kladno <b>Koz</b>ovka-Kokos')
    expect(marked.marked2).to.equal('Brno-Brno-mesto, <b>Koz</b>i 27/2 "BMKOZ"')
  })

  it('should mark substring case 03', () => {
    const marked = mark(
      '[SUMMITD] Kladno Kozovka-Kokos',
      'Pleteny Ujezd-Pleteny Ujezd, 99 "kozovka"'
    )
    expect(marked.marked1).to.equal('[SUMMITD] Kladno <b>Kozovka</b>-Kokos')
    expect(marked.marked2).to.equal('Pleteny Ujezd-Pleteny Ujezd, 99 "<b>kozovka</b>"')
  })

  it('should mark substring case 04', () => {
    const marked = mark(
      '[SUMMITD] Kladno Kozova Hora-Kokos',
      'Pleteny Ujezd-Pleteny Ujezd, 99 "kozova hora"'
    )
    expect(marked.marked1).to.equal('[SUMMITD] Kladno <b>Kozova Hora</b>-Kokos')
    expect(marked.marked2).to.equal('Pleteny Ujezd-Pleteny Ujezd, 99 "<b>kozova hora</b>"')
  })

  it('should mark substring case 05', () => {
    const marked = mark(
      '[SUMMITD] Kladno Hora Kozova-Kokos',
      'Pleteny Ujezd-Pleteny Ujezd, 99 "hora kozova"'
    )
    expect(marked.marked1).to.equal('[SUMMITD] Kladno <b>Hora Kozova</b>-Kokos')
    expect(marked.marked2).to.equal('Pleteny Ujezd-Pleteny Ujezd, 99 "<b>hora kozova</b>"')
  })

})
