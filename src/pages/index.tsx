import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'
import EmployeeTile from '../components/EmployeeTile'
import FourColumns from '../components/FourColumns'
import Heading from '../components/heading/Heading'
import HeroSlider from '../components/HeroSlider'
import Text from '../components/text/Text'

export interface Column {
  title: string
  image: { childImageSharp: { fluid: FluidObject } }
  text: string
}

interface ManagementSlide {
  name: string
  role: string
  image: { childImageSharp: { fluid: FluidObject } }
  signature: { childImageSharp: { fluid: FluidObject } }
}

interface IndexData {
  siteData: {
    frontmatter: {
      intro_text: {
        body: string
        subline: string
        title: string
      }
      slider: {
        slides: [{ image: { childImageSharp: { fluid: FluidObject } } }]
      }
      management: {
        slides: ManagementSlide[]
      }
      nursing: Column
      care: Column
      special: Column
    }
  }
}

export default ({ data }: { data: IndexData }) => {
  const {
    management: { slides: managementData },
    slider: { slides: heroImages },
    intro_text,
    nursing,
    care,
    special,
  } = data.siteData.frontmatter

  const transformedHeroImages: FluidObject[] = heroImages.map(
    ({
      image: {
        childImageSharp: { fluid },
      },
    }: {
      image: { childImageSharp: { fluid: FluidObject } }
    }) => fluid,
  )
  const { title, subline, body } = intro_text

  return (
    <>
      <HeroSlider images={transformedHeroImages} />
      <div className='max-container'>
        <div className='text-container' style={{ paddingTop: '2.4rem' }}>
          <Heading size={1} uppercase center orange fontWeight={500}>
            {title}
          </Heading>
          <div style={{ marginTop: '0.824rem' }}>
            <Heading size={4} center orange fontWeight={500}>
              {subline}
            </Heading>
          </div>
          <div style={{ marginTop: '1.4rem' }}>
            <Text preLine center>
              {body}
            </Text>
          </div>
        </div>
        <div className='employeee-tile-container'>
          {managementData.map(({ name, role, image, signature }: ManagementSlide, index) => (
            <EmployeeTile
              key={index}
              title={name}
              alt='Bild von der Geschäftsführung'
              name={name}
              job={role}
              image={image.childImageSharp.fluid}
              signature={signature.childImageSharp.fluid}
            />
          ))}
        </div>

        <FourColumns columns={[nursing, care, special]} />
      </div>
    </>
  )
}

export const query = graphql`
  {
    siteData: markdownRemark(frontmatter: { pageKey: { eq: "page_home" } }) {
      frontmatter {
        title
        slider {
          slides {
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }

        intro_text {
          body
          subline
          title
        }

        management {
          slides {
            name
            role
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }

            signature {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        nursing {
          title
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          text
        }
        care {
          title
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          text
        }
        special {
          title
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          text
        }
      }
    }
  }
`
