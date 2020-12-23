import React from "react";
import { Helmet } from "react-helmet";
import Heading from "../components/heading/Heading";
import { graphql } from "gatsby";
import JobTile from "../components/jobTile/JobTile";

interface Props {
  jobs: { edges: any };
  data: {
    jobs: {
      edges: [
        {
          node: {
            fields: {
              slug: string;
            };
            frontmatter: {
              title: number;
              text: string;
            };
          };
        }
      ];
    };
  };
}

export default ({ data }: { data: Props }) => {
  const { edges: jobs } = data.jobs;
  return (
    <>
      <Helmet
        title={"Stellenanzeigen - Interkultureller Sozialdienst Hannover"}
        meta={[
          {
            name: "description",
            content:
              "Du sucht einen Job in einem Sozialdienst in Hannover ? Hier findest du die aktuellen Stellenausschreibungen des Interkulturellen Sozialdienst für Hannover und die Region."
          }
        ]}
      />
      <div className="max-container">
        <div className="text-container">
          <div className="padding-heading">
            <Heading size={1} uppercase center orange fontWeight={500}>
              Stellenangebote
            </Heading>
          </div>
          <div className="flex">
            {jobs.map(
              (
                job: {
                  node: {
                    frontmatter: {
                      title: string | undefined;
                      text: string | undefined;
                    };
                    fields: { slug: string | undefined };
                  };
                },
                index: number
              ) => (
                <JobTile
                  key={index}
                  title={job.node.frontmatter.title}
                  text={job.node.frontmatter.text}
                  link={job.node.fields.slug}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  {
    jobs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/stellen/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            text
          }
        }
      }
    }
  }
`;
