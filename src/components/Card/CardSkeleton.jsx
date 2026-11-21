import * as S from './CardSkeleton.styled';

export default function CardSkeleton() {
  return (
    <S.SkeletonItem>
      <S.SkeletonCard>
        <S.SkeletonTop>
          <S.SkeletonTopic />
          <S.SkeletonDots />
        </S.SkeletonTop>
        <S.SkeletonTitle />
        <S.SkeletonDate />
      </S.SkeletonCard>
    </S.SkeletonItem>
  );
}