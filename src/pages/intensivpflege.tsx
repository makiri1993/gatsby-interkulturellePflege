import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import Heading from '../components/heading/Heading'
import Text from '../components/text/Text'
import TextWithImg from '../components/imgText/TextWithImg';


interface Data {
  siteData: {
    frontmatter: {
      title: string
      text_one: string
      image?: object
      text_two: string
      text_three: string
      list_one: Array<string>
      list_two: Array<string>
      list_three: Array<string>
    }
  }
}
// tslint:disable-next-line:variable-name no-var-requires
const logo_1: string = require('../../static/img/schriftzug_Wohngemeinschaft.png')
// tslint:disable-next-line:variable-name no-var-requires
const logo_2: string = require('../../static/img/logo_baum.png')
// tslint:disable-next-line:variable-name no-var-requires
const flylerLink: string = require('../../static/img/intensivpflege/IKS-AIWG-Flyer_ku_web.pdf')

export default ({ data }: { data: Data }) => {
  const { title, text_one, text_two, image, text_three, list_one, list_two, list_three } = data.siteData.frontmatter
  const completeText = text_one + text_two;
  return (
    <>
      <Helmet
        title={'Intensivpflege - Interkultureller Sozialdienst Hannover'}
        meta={[
          {
            name: 'description',
            content:
              'Hier finden Sie alle Informationen zur Intensivpfelge von unserem Sozialdienst. Wir bieten eine intensivpflegerische Versorgung zu Hause oder in ' +
              'einer ambulant betreuten Wohngemeinschaft.',
          },
        ]}
      />
      <div className='max-container'>
        <div className='text-container'>
          <div className='padding-heading'>
            <Heading size={1} uppercase center red fontWeight={500}>
              {title}
            </Heading>
          </div>
          <TextWithImg image={image} textRight>{completeText}</TextWithImg>
          <Text>Wir bieten Ihnen:</Text>
          <ul>
            {list_one.list_items.map((el: any) => (
              <li className='color-red'>
                <Text>{el.item}</Text>
              </li>
            ))}
          </ul>
          <Heading size={4} red uppercase>
            {list_two.title}
          </Heading>

          <ul>
            {list_two.list_items.map((el: any) => (
              <li className='color-red'>
                <Text>{el.item}</Text>
              </li>
            ))}
          </ul>
          <Text>Für eine umfassende Beratung sowie zu allen Fragen rund um die Finanzierung stehen wir Ihnen gerne zur Verfügung.</Text>
          <Text>
            <a className='color-red' target='_blank' title='link zu Flyer Intensivpflege' href={flylerLink}>
              Unseren Flyer finden Sie hier.
            </a>
          </Text>
          <div className='d-flex align-center'>
            <div style={{ marginRight: '1rem' }}>
              <Heading size={4} red>
                Marion Hartmann
              </Heading>
            </div>
            <Heading size={6}>| Leitung der Intensivpflege</Heading>
          </div>
          <a className='color-red' href='mailto:hartmann@iks-hannover.de'>
            hartmann@iks-hannover.de
          </a>
          <div className='d-flex align-center'>
            <div style={{ marginRight: '1rem' }}>
              <Heading size={4} red>
                Marco Schillaci
              </Heading>
            </div>
            <Heading size={6}>| Fachliche Leitung</Heading>
          </div>
          <a className='color-red' href='mailto:schillaci@iks-hannover.de'>
            schillaci@iks-hannover.de
          </a>
          <div className='DivCenter'>
            <img className='StyledIMGIntensiv' alt='Logo der Wohngemeinschaft List' title='Wohngemeinschaft List' src={logo_1} />
            <img className='StyledIMGIntensiv' alt='Logo der Wohngemeinschaft List' title='Wohngemeinschaft List' src={logo_2} />
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  {
    siteData: markdownRemark(frontmatter: { pageKey: { eq: "page_intensivpflege" } }) {
      frontmatter {
        title
        text_one
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        text_two
        list_one {
          title
          list_items {
            item
          }
        }
        list_two {
          title
          list_items {
            item
          }
        }
        list_three {
          title
          list_items {
            item
          }
        }
      }
    }
  }
`
