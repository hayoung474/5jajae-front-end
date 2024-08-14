import styled from 'styled-components';
import Portal from '../util/Portal';
import Text from '../Text';
import { snackBarActions, useSnackBarStore } from '~/store/snackBar';
import { flexCenter } from '~/style/mixins';
import SolidButton from '../buttons/SolidButton';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const GlobalSnackBar = () => {
  const message = useSnackBarStore((state) => state.message);
  const isOpen = useSnackBarStore((state) => state.isOpen);
  const autoHideDuration = useSnackBarStore((state) => state.autoHideDuration);
  const handleClose = () => {
    snackBarActions.close();
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        snackBarActions.close();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <SnackBar
            initial={{ y: 100, opacity: 0 }} // 컴포넌트가 시작할 위치와 투명도
            animate={{ y: 0, opacity: 1 }} // 컴포넌트가 도달할 위치와 투명도
            transition={{
              type: 'spring', // 바운스 효과를 위한 스프링 애니메이션
              stiffness: 400, // 바운스의 탄성 강도 (값이 높을수록 강한 반동)
              damping: 25, // 바운스의 감쇠 정도 (값이 낮을수록 더 많은 반동)
              duration: 0.8, // 전체 애니메이션 시간
              ease: 'easeOut',
            }}
            exit={{ opacity: 0 }} // 컴포넌트가 사라질 때 fade-out
          >
            <Text variant="label_2" color="cool_gray_200" weight="regular" className="message">
              {message}
            </Text>
            <SolidButton size="medium" onClick={handleClose}>
              확인
            </SolidButton>
          </SnackBar>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const SnackBar = styled(motion.div)`
  z-index: 9999;

  ${flexCenter}

  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);

  max-width: 320px;
  gap: 16px;

  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;

  .message {
    flex: 1;
    white-space: pre-wrap;
  }
`;
export default GlobalSnackBar;
