/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import * as React from "react";
import useTypedSelector from "../../hooks/useTypedSelector";
import { SetCollectionAndBook } from "../../interfaces";
import useSetCollectionAndBook from "../../hooks/useSetCollectionAndBook";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
  mergeRootProps
} from "opds-web-client/lib/components/mergeRootProps";
import { PageLoader } from "../../components/LoadingIndicator";
import Lane from "../../components/Lane";

const Home: React.FC<{ setCollectionAndBook: SetCollectionAndBook }> = ({
  setCollectionAndBook
}) => {
  // set collection and book
  useSetCollectionAndBook(setCollectionAndBook);

  const collection = useTypedSelector(state => state.collection);

  if (collection.isFetching) {
    return <PageLoader />;
  }

  const lanes = collection?.data?.lanes ?? [];
  return (
    <div>
      {lanes.map(lane => (
        <Lane key={lane.url} lane={lane} />
      ))}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeRootProps
)(Home);