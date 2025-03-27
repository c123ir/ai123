import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

export interface FadeProps {
  children?: ReactNode;
  in?: boolean;
  appear?: boolean;
  timeout?: number | { appear?: number; enter?: number; exit?: number };
  className?: string;
  style?: React.CSSProperties;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
}

const getTimeout = (timeout: FadeProps['timeout']): { enter: number; exit: number } => {
  if (typeof timeout === 'number') {
    return { enter: timeout, exit: timeout };
  } 
  
  return {
    enter: timeout?.enter || 225,
    exit: timeout?.exit || 195
  };
};

const StyledFade = styled.div<{
  $in?: boolean;
  $timeout: { enter: number; exit: number };
  $mountOnEnter?: boolean;
  $unmountOnExit?: boolean;
}>`
  opacity: ${props => props.$in ? 1 : 0};
  transition: opacity ${props => props.$timeout.enter}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  display: ${props => {
    if (!props.$in && props.$unmountOnExit) return 'none';
    if (!props.$in && props.$mountOnEnter) return 'none';
    return 'inherit';
  }};
`;

/**
 * کامپوننت Fade برای اعمال انیمیشن محو و ظاهر شدن به محتوا
 * جایگزینی برای Fade از Material UI
 * 
 * نمونه استفاده:
 * ```jsx
 * <Fade in={visible} timeout={500}>
 *   <div>محتوایی که با انیمیشن محو و ظاهر می‌شود</div>
 * </Fade>
 * ```
 */
const Fade: React.FC<FadeProps> = ({
  children,
  in: inProp = false,
  appear = false,
  timeout = 225,
  className,
  style,
  mountOnEnter = false,
  unmountOnExit = false,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
}) => {
  const timeoutConfig = getTimeout(timeout);
  
  // اجرای کالبک‌های چرخه حیات
  React.useEffect(() => {
    if (inProp) {
      onEnter?.();
      setTimeout(() => {
        onEntering?.();
        setTimeout(() => {
          onEntered?.();
        }, timeoutConfig.enter);
      }, 0);
    } else {
      onExit?.();
      setTimeout(() => {
        onExiting?.();
        setTimeout(() => {
          onExited?.();
        }, timeoutConfig.exit);
      }, 0);
    }
  }, [inProp, onEnter, onEntering, onEntered, onExit, onExiting, onExited, timeoutConfig]);
  
  return (
    <StyledFade
      $in={inProp}
      $timeout={timeoutConfig}
      $mountOnEnter={mountOnEnter}
      $unmountOnExit={unmountOnExit}
      className={className}
      style={style}
    >
      {children}
    </StyledFade>
  );
};

export default Fade; 