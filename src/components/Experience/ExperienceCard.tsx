import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Experience } from "../../types/types";

interface Props {
    experience: Experience;
}

const ExperienceCard = ({ experience }: Props) => {

    const color = useMemo(() => {
        switch (experience.type) {
            case "gemstone":
                return "#FF5733";
            case "tarot":
                return "#33FF57";
            case "consultation":
                return "#3357FF";
            default:
                return "#CCCCCC";
        }
    }, [experience.type]);
    
    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <Text style={styles.title}>{experience.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        marginRight: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default React.memo(ExperienceCard);