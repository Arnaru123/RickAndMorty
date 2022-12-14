import { useEffect } from "react";
import { PageView } from "components/common/PageView";
import { Pagination } from "components/common/Pagination";
import { usePageParamToNumber } from "hooks/usePageParamToNumber";
import { useAppDispatch, useAppSelector } from "store";
import {
  ids,
  lastPageSelector,
  loadingCharactersSelector,
  loadingErrorSelector,
} from "store/selectors/characters";
import { fetchCharacters } from "store/slices/characters";
import { LoadingStatus } from "types/loadingStatus";
import { ErrorMessage } from "components/common/ErrorMessage";
import { CharacterList } from "components/common/CharacterList";
import { Filters } from "components/common/Filters";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material";

const FixedPagination = styled(Pagination)(() => ({
  position: "fixed",
  top: 120,
  left: 40,
}));

export const Characters = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => ids(state));
  const loading = useAppSelector(loadingCharactersSelector);
  const isLoading = loading === LoadingStatus.PENDING;
  const currentPage = usePageParamToNumber();
  const lastPage = useAppSelector(lastPageSelector);
  const error = useAppSelector(loadingErrorSelector);
  const [searchParams] = useSearchParams();

  const gender = searchParams.get("gender") || "";
  const name = searchParams.get("name") || "";

  useEffect(() => {
    dispatch(
      fetchCharacters({
        page: currentPage,
        filter: { name: name, gender: gender },
      })
    );
  }, [currentPage, name, gender, dispatch]);

  return (
    <PageView title="All characters">
      {!!lastPage && (
        <FixedPagination
          currentPage={currentPage}
          lastPage={lastPage}
          isLoading={isLoading}
        />
      )}
      <Filters />
      <CharacterList
        characters={characters}
        hasError={!!error}
        isLoading={isLoading}
      />
      {error && <ErrorMessage message={error} />}
    </PageView>
  );
};
