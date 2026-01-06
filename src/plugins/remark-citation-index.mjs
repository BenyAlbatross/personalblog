
import { visit } from 'unist-util-visit';

export function remarkCitationIndex() {
    return (tree) => {
        const citations = new Map();
        let count = 0;

        visit(tree, 'mdxJsxTextElement', (node) => {
            if (node.name === 'Cite') {
                const idAttribute = node.attributes.find((attr) => attr.name === 'id');
                if (idAttribute && idAttribute.value) {
                    const id = idAttribute.value.toUpperCase();
                    if (!citations.has(id)) {
                        count++;
                        citations.set(id, count);
                    }
                    const index = citations.get(id);

                    // Add the index attribute to the node
                    node.attributes.push({
                        type: 'mdxJsxAttribute',
                        name: 'index',
                        value: index
                    });
                }
            }
        });
    };
}
