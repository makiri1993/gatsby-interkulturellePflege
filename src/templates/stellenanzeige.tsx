import { graphql } from "gatsby";
import React from "react";
import Heading from "../components/heading/Heading";
import { Helmet } from "react-helmet";
import Text from "../components/text/Text";

interface Props {
  markdownRemark: { frontmatter: any };
  data: {
    jobs: {
      edges: [
        {
          node: {
            fields: {
              slug: string;
            };
            frontmatter: {
              title_seo: string;
              description_seo: string;
              title: number;
              text: string;
              text_one: string;
            };
          };
        }
      ];
    };
  };
}

const Stellenanzeige = ({ data }: { data: Props }) => {
  const { frontmatter: job } = data.markdownRemark;
  return (
    <>
      <Helmet
        title={job.title_seo}
        meta={[
          {
            name: "description",
            content: job.description_seo
          }
        ]}
      />
      <div className="max-container">
        <div className="text-container">
          <div className="padding-heading">
            <Heading size={1} center orange fontWeight={500}>
              {job.title}
            </Heading>
          </div>
          <Heading size={4} orange fontWeight={500}>
            Darum geht´s:
          </Heading>
          <Text preLine>{job.text_one}</Text>
          <br />
          <Heading size={4} orange fontWeight={500}>
            Was du tun wirst:
          </Heading>
          <ul>
            {job.list_one.list_items.map((el: any) => (
              <li className="color-orange">
                <Text>{el.item}</Text>
              </li>
            ))}
          </ul>
          <br />
          <Heading size={4} orange fontWeight={500}>
            Was du mitbringst:
          </Heading>
          <ul>
            {job.list_two.list_items.map((el: any) => (
              <li className="color-orange">
                <Text>{el.item}</Text>
              </li>
            ))}
          </ul>
          <br />
          <Heading size={4} orange fontWeight={500}>
            Was wir dir bieten:
          </Heading>
          <ul>
            {job.list_three.list_items.map((el: any) => (
              <li className="color-orange">
                <Text>{el.item}</Text>
              </li>
            ))}
          </ul>
          <br />
          <Heading size={4} orange fontWeight={500}>
            Beginn der Tätigkeit:
          </Heading>
          <Text preLine>{job.start}</Text>
          <br />
          <Heading size={4} orange fontWeight={500}>
            Anzahl offener Stellen:
          </Heading>
          <Text preLine>{job.number}</Text>
          <Text preLine>
            Haben wir dein Interesse geweckt und hast du Lust auf die
            Herausforderung? Dann sende uns deine Unterlagen an
            <br />
            <a
              className="ext-link-orange"
              href="mailto:iks-hannover@iks-hannover.de"
            >
              iks-hannover@iks-hannover.de
            </a>
            <br />
            Wir freuen uns, dich kennenzulernen.
          </Text>
        </div>
      </div>
    </>
  );
};

export default Stellenanzeige;

export const aboutPageQuery = graphql`
  query Stellenanzeige($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title_seo
        description_seo
        title
        text
        text_one
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
        start
        number
      }
    }
  }
`;
