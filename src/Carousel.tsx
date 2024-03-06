import { Component, MouseEvent } from 'react'

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  }

  // when we don't pass a prop to Carousel component defaultProp is used
  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/non.jpg'],
  }

  // will be run once every time the component rendered on the DOM
  componentDidMount() {}

  // every single time when state updated
  componentDidUpdate(){}

  handleIndexClick = (index: number) => {
    this.setState({
      active: index
    })
  }

  render() {
    const { active } = this.state
    const { images } = this.props

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <button
              onClick={() => this.handleIndexClick(index)}
              key={photo}
              className={index === active ? 'active' : ''}
              aria-label={`Thumbnail ${index + 1}`}
            >
              <img
                src={photo}
                alt={`animal thumbnail ${index}`}
              />
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel
