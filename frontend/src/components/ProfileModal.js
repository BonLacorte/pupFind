import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Text,
    Image,
} from "@chakra-ui/react";
import { useState } from "react";

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Check if user.founder exists before trying to access its properties
    const founderName = user.founder ? user.founder.founderName : "Unknown Founder";
    const founderEmail = user.founder ? user.founder.founderEmail : "Unknown Email";
    const founderPic = user.founder ? user.founder.founderPic : "";

    return (
        <>
        {children ? (
            <span onClick={onOpen}>{children}</span>
        ) : (
            <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
        )}
        <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h="410px">
            <ModalHeader
                fontSize="40px"
                fontFamily="Work sans"
                d="flex"
                justifyContent="center"
            >
                <p>
                    <span className="font-bold">{founderName}</span>
                </p>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
                d="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
            >
                <Image
                borderRadius="full"
                boxSize="150px"
                src={founderPic}
                // src=""
                alt={founderName}
                // alt="hello"
                />
                <Text
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                >
                Email: {founderEmail}
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

export default ProfileModal;
