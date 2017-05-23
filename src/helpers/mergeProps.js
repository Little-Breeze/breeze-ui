import classnames from 'classnames';

export const mergeProps = (instanceProps, defaultProps) => {
  let { className, style, ...others } = instanceProps;
  let { 
    className: defaultClassName,
    style: defaultStyle = {},
    ...remainingProps
   } = defaultProps;

   className = classnames(defaultClassName, className);
   style = {....defaultStyle, ...style};
   remainingProps = {...instanceProps, ...remainingProps};

   return { className, style, ...remainingProps };
};