import { useState, useRef, useEffect } from 'react';
import { Container, TabsContainer, TabButton, TabContent, TabsHeader } from './styles';
import LaboratorioForm from './LaboratorioForm';
import ClienteForm from './ClienteForm';
import ObraForm from './ObraForm';
import CargaConcretoForm from './CargaConcretoForm';
import AmostraForm from './AmostraForm';

const Cadastros = () => {
  const [activeTab, setActiveTab] = useState('laboratorio');
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Estrutura das abas disponíveis
  const tabs = [
    { id: 'laboratorio', label: 'Laboratórios', component: LaboratorioForm },
    { id: 'cliente', label: 'Clientes', component: ClienteForm },
    { id: 'obra', label: 'Obras', component: ObraForm },
    { id: 'carga', label: 'Cargas de Concreto', component: CargaConcretoForm },
    { id: 'amostra', label: 'Amostras', component: AmostraForm },
  ];

  // Centralizar a aba ativa na visualização
  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      if (activeTabElement) {
        const tabsContainer = tabsRef.current;
        const tabsRect = tabsContainer.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();
        
        // Calculando a posição de rolagem para centralizar a aba
        const scrollLeft = tabRect.left + tabRect.width / 2 - tabsRect.left - tabsRect.width / 2;
        
        tabsContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

  console.log('Renderizando Cadastros. Aba ativa:', activeTab);

  return (
    <Container>
      <TabsHeader>
        <h1>Cadastros</h1>
        <p>Gerencie todos os seus cadastros em um só lugar</p>
      </TabsHeader>
      
      <TabsContainer ref={tabsRef}>
        {tabs.map(tab => (
          <TabButton 
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-tab-id={tab.id}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsContainer>
      
      <TabContent>
        {tabs.map(tab => (
          activeTab === tab.id && <tab.component key={tab.id} />
        ))}
      </TabContent>
    </Container>
  );
};

export default Cadastros;
