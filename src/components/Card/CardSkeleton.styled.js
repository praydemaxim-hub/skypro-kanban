import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #c1cddc 0%,
    #e9eef7 50%,
    #c1cddc 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const SkeletonItem = styled.div`
  padding: 5px;
`;

export const SkeletonCard = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px 13px 19px;
`;

export const SkeletonTop = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SkeletonTopic = styled(SkeletonBase)`
  width: 82px;
  height: 20px;
  border-radius: 18px;
`;

export const SkeletonDots = styled(SkeletonBase)`
  width: 18px;
  height: 4px;
  border-radius: 2px;
`;

export const SkeletonTitle = styled(SkeletonBase)`
  width: 113px;
  height: 13px;
  border-radius: 4px;
`;

export const SkeletonDate = styled(SkeletonBase)`
  width: 58px;
  height: 13px;
  border-radius: 4px;
`;