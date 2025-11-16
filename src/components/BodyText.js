import PropTypes from 'prop-types';

export default function BodyText({
  text = '',
  color = 'text-primaryText',
  size = 'text-base',
  lineHeight = 'leading-normal',
  fontWeight = 'font-normal',
  centered = true,
  className = '',
}) {
  return (
    <p
      className={`${centered ? 'text-center' : ''} break-words ${color} ${size} ${lineHeight} ${fontWeight} ${className}`}
    >
      {text}
    </p>
  );
}

BodyText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  lineHeight: PropTypes.string,
  fontWeight: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string,
};