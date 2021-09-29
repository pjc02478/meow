module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['__tests__/catapi'],
  "transformIgnorePatterns": [
    'node_modules/(?!(jest-)?@react-navigation|@react-native|react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|(@[a-zA-Z]+/)?(bs|reason|rescript)-(.*)+)'
  ],
  setupFiles: [
    './jest/setup.js'
  ],
}