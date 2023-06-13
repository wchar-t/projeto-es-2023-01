import { menuAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  list: {
    bg: '#1f1f23',
    border: '1px solid #131313',
    borderRadius: '5px',
  },
  item: {
    bg: 'transparent',
    _hover: {
      bg: '#2e2e32',
    },
  },
  divider: {
    borderColor: '#313131',
  },
});

export default defineMultiStyleConfig({
  baseStyle,
});
