export function useScrollIntoView(el: HTMLElement | null): () => void {
  const scrollElementIntoView = () => {
    if (el) {
      window.scrollTo({
        behavior: 'smooth',
        top:
          el.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          100,
      })
      // ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
  return scrollElementIntoView
}
