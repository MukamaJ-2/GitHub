import { useState } from 'react'
import { Box, Container, Heading, VStack, Input, Button, Text, Link as ChakraLink, useToast, Image, Flex } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, we'll just check for any email/password
      if (email && password) {
        login({ email, name })
        navigate('/dashboard')
        toast({
          title: 'Registration successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        throw new Error('Please fill in all fields')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex minH="100vh" bg="gray.50">
      <Box flex={1} display={{ base: 'none', md: 'block' }}>
        <Image
          src="https://images.unsplash.com/photo-1601924994987-69e26d50dc96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Daycare Center"
          h="100%"
          objectFit="cover"
        />
      </Box>
      <Container maxW="md" py={20}>
        <Box bg="white" p={8} borderRadius="xl" boxShadow="lg">
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Heading
                size="xl"
                mb={2}
                bgGradient="linear(to-r, blue.600, blue.400)"
                bgClip="text"
              >
                Create Account
              </Heading>
              <Text color="gray.600">Join our daycare community</Text>
            </Box>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <VStack w="full" spacing={4}>
                  <Input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    size="lg"
                    focusBorderColor="blue.500"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="lg"
                    focusBorderColor="blue.500"
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    size="lg"
                    focusBorderColor="blue.500"
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    size="lg"
                    focusBorderColor="blue.500"
                  />
                  <Button
                    w="full"
                    colorScheme="blue"
                    type="submit"
                    isLoading={isLoading}
                    size="lg"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  >
                    Create Account
                  </Button>
                </VStack>
                <Text>
                  Already have an account?{' '}
                  <ChakraLink
                    as={RouterLink}
                    to="/login"
                    color="blue.500"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Sign In
                  </ChakraLink>
                </Text>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
    </Flex>
  )
}

export default Register 