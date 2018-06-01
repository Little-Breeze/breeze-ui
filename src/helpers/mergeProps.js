import classnames from 'classnames';

function mergeProps (instanceProps, defaultProps) {
  let { className, style, ...others } = instanceProps;
  let { 
    className: defaultClassName,
    style: defaultStyle = {},
    ...remainingProps
   } = defaultProps;

   className = classnames(defaultClassName, className);
   style = {...defaultStyle, ...style};
   remainingProps = {...instanceProps, ...remainingProps};

   return { className, style, ...remainingProps };
};

export default mergeProps;