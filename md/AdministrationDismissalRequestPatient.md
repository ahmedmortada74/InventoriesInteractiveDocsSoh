← Go back to 
[Inventories Module Documentation](/Inventories)

# AdministrationDismissalRequestPatient.aspx

## Overview

**File**: `\Inventories\Process\AdministrationDismissalRequestPatient.aspx`
**Purpose**: Patient administration dismissal request system for inventory dispensing with service integration
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, patient services staff responsible for patient-related inventory requests

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Patient Selection (Required for Request)**
- **Patient Dropdown**: Must select valid patient from active patient list
- **Error Prevention**: System validates patient is selected before adding items
- **Data Source**: Patient_information table filtered by active visits (Active_Close='A')
- **Default Behavior**: User must select patient manually
- **Error Message**: Validation prevents item addition without patient selection
- **Validation**: Only patients with active visits are available

#### 2. **Account Selection (Required for Request)**
- **Account Dropdown**: Must select valid account for selected patient
- **Error Prevention**: System validates account is selected before adding items
- **Data Source**: VisitAccount table filtered by patient FileId and active visits
- **Default Behavior**: User must select account manually after patient selection
- **Error Message**: Validation prevents item addition without account selection
- **Validation**: Only accounts associated with selected patient are available

#### 3. **Store Selection (Required for Item Selection)**
- **Store Dropdown**: Must select valid store for item availability
- **Error Prevention**: System validates store is selected before item selection
- **Data Source**: Inventories_wharehouse_store filtered by procedure stores and active status
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item selection without store selection
- **Validation**: Only stores with procedure access (Setup_Procedure_FK=3) and active status

#### 4. **Item Selection (Required for Addition)**
- **Item Dropdown**: Must select valid item from store inventory
- **Error Prevention**: System validates item is selected before adding to request
- **Data Source**: storeBalance_withbatch_no and Inventories_Stock_Saving with quantity > 0
- **Default Behavior**: User must select item manually after store selection
- **Error Message**: Validation prevents addition without item selection
- **Validation**: Only items with available quantity and proper dispensing type (fk_disp_type=4)

#### 5. **Quantity Input (Required for Addition)**
- **Quantity Field**: Must enter valid quantity for item request
- **Error Prevention**: System validates quantity is greater than 0
- **Data Source**: User input with validation
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents addition with zero or negative quantity
- **Validation**: Quantity must be positive number

#### 6. **Period Selection (Required for Addition)**
- **Period Date**: Must select valid period date for item need duration
- **Error Prevention**: System validates period is selected before adding items
- **Data Source**: User input with date validation
- **Default Behavior**: User must select period manually
- **Error Message**: Validation prevents addition without period selection
- **Validation**: Period must be valid date

#### 7. **Service Selection (Conditional for Service Items)**
- **Service Dropdown**: Required when "بخدمة" (with service) is selected
- **Error Prevention**: System validates service is selected for service items
- **Data Source**: ChargeItem table filtered by Item_Service='S' and active status
- **Default Behavior**: User must select service when service option is chosen
- **Error Message**: Validation prevents addition without service selection
- **Validation**: Only active services with proper header associations

### Common Error Scenarios and Prevention

#### **Patient and Account Errors**
- **Error**: No patient selected
- **Prevention**: Always select patient before adding items
- **Error**: No account selected for patient
- **Prevention**: Always select account after patient selection
- **Error**: Patient has no active visits
- **Prevention**: Ensure patient has active visit records

#### **Store and Item Errors**
- **Error**: No store selected
- **Prevention**: Always select store before item selection
- **Error**: No items available in store
- **Prevention**: Ensure store has items with available quantity
- **Error**: Item has insufficient quantity
- **Prevention**: Check item availability before adding to request

#### **Quantity and Period Errors**
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: No period selected
- **Prevention**: Always select period for item need duration
- **Error**: Invalid date format
- **Prevention**: Use valid date format for period selection

#### **Service Integration Errors**
- **Error**: Service required but not selected
- **Prevention**: Always select service when "بخدمة" option is chosen
- **Error**: No services available for item
- **Prevention**: Ensure item has associated services
- **Error**: Service inactive or deleted
- **Prevention**: Use only active services with proper status

#### **Request Management Errors**
- **Error**: No items added to request
- **Prevention**: Add at least one item before saving request
- **Error**: Request save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Request edit fails
- **Prevention**: Select valid request from history before editing

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have patient administration permissions** via employee group assignments
3. **Patient must have active visit** in VisitAccount table
4. **Store must have procedure access** for dispensing operations
5. **Items must have available quantity** in selected store
6. **Items must have proper dispensing type** (fk_disp_type=4)

#### **Required System State**
- User authentication must be active
- Patient visit records must be current and active
- Store access permissions must be configured
- Item inventory data must be current
- Service associations must be properly configured
- Dispensing workflow must be enabled

### Success Criteria

#### **For Patient Selection**
- ✅ Patient dropdown populated with active patients only
- ✅ Account dropdown updates based on selected patient
- ✅ Patient validation prevents item addition without selection
- ✅ Account validation ensures proper patient-account association

#### **For Store and Item Selection**
- ✅ Store dropdown populated with accessible stores only
- ✅ Item dropdown populated with available items in selected store
- ✅ Item availability validation prevents selection of unavailable items
- ✅ Unit information automatically populated for selected item

#### **For Item Addition**
- ✅ Quantity validation ensures positive values only
- ✅ Period validation ensures valid date selection
- ✅ Service validation ensures proper service selection when required
- ✅ Item addition updates temporary items grid successfully

#### **For Request Management**
- ✅ Request save creates proper header and detail records
- ✅ Request edit updates existing records properly
- ✅ Request delete shows confirmation and processes correctly
- ✅ Request history displays all active requests for user

#### **For Service Integration**
- ✅ Service option selection enables service dropdown
- ✅ Service validation prevents addition without service when required
- ✅ Service quantity tracking works properly
- ✅ Service deletion removes from temporary service list

#### **For Data Management**
- ✅ Temporary items grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" dir="rtl" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for patient administration requests

### Patient and Account Section

```html
<!-- Patient and Account Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderNO" ReadOnly="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderType" Text=" 4 - صرف علي مريض " ReadOnly="True"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Patient" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="true" OnSelectedIndexChanged="Patient_SelectedIndexChanged" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="PatientDS" ValueField="FileId" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileId" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم الحساب" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Account" runat="server" TextFormatString="{1} - {0}" AutoPostBack="false" Enabled="true" DataSourceID="AccountDS" ValueField="AccountNo" TextField="AccountNo">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="AccountNo" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Store and Item Selection Section

```html
<!-- Store and Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="المخزن">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="store" runat="server" TextFormatString="{0} - {1}" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="StoreDs" ValueField="code" TextField="arabic_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Item" runat="server" TextFormatString="{0} - {1}" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="ItemDS" ValueField="item_code" TextField="arabic_name" OnSelectedIndexChanged="Item_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="DespenseType" Enabled="false" DataSourceID="DespenseTypeDS" TextField="english_name" ValueField="id" OnSelectedIndexChanged="DespenseType_SelectedIndexChanged" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="Unit" ReadOnly="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="Quentity" AllowMouseWheel="false"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapDateEdit runat="server" ID="Period" OnCalendarDayCellPrepared="Period_CalendarDayCellPrepared"></dx:BootstrapDateEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="كمية الصنف">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox ID="txtquantity" runat="server" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Service Integration Section

```html
<!-- Service Integration -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButtonList runat="server" AutoPostBack="true" CaptionSettings-Position="Before" OnSelectedIndexChanged="withOrWithoutService_SelectedIndexChanged" ID="withOrWithoutService">
                        <Items>
                            <dx:BootstrapListEditItem Text="-----------> بخدمة" Value="1" Selected="true"></dx:BootstrapListEditItem>
                            <dx:BootstrapListEditItem Text="-----------> بدون خدمة" Value="2"></dx:BootstrapListEditItem>
                        </Items>
                    </dx:BootstrapRadioButtonList>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="6" Caption="الخدمة">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="service" runat="server" TextFormatString="{0} - {1}" AutoPostBack="false" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="service_ds" ValueField="Code" TextField="ArabicName">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Code" />
                            <dx:BootstrapListBoxField FieldName="ArabicName" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="12" Visible="false" Caption="عدد تلقي الخدمات">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="quantity_service" AllowMouseWheel="false"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Operation Buttons Section

```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutItem ColSpanMd="4" Caption=" ">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left; color: white; background-color: white">
                <dx:BootstrapButton runat="server" Text="  اضافة الصنف" ID="BTN_ADD" OnClick="BTN_ADD_Click" CssClasses-Control="cc">
                    <CssClasses Icon="simple-icon-plus" />
                    <SettingsBootstrap RenderOption="Info" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text="  تعديل الصنف" ID="BTN_Edit_Temp" OnClick="BTN_Edit_Temp_Click" CssClasses-Control="cc">
                    <CssClasses Icon="simple-icon-note" />
                    <SettingsBootstrap RenderOption="Dark" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" حذف الصنف " ID="BTN_Delete_Temp" OnClick="BTN_Delete_Temp_Click" CssClasses-Control="cc">
                    <CssClasses Icon="simple-icon-trash" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Data Grids Section

```html
<!-- Temporary Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="8">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="id" DataSourceID="TempItemsDS" OnSelectionChanged="tempItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discription" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Item_Type_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" Caption="الكمية" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Due_Date" Caption="مدة الاحتياج" VisibleIndex="1"></dx:BootstrapGridViewDateColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="arabic_name" SummaryType="Count" DisplayFormat="عدد الاصناف =  {0 }" />
                    <dx:ASPxSummaryItem FieldName="Quntity" SummaryType="Sum" DisplayFormat="كمية الاصناف =  {0 }" />
                </TotalSummary>
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<!-- Services Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="services_aded_grid" AutoPostBack="true" ClientInstanceName="tempService" EnableRowsCache="False" OnRowDeleting="services_aded_grid_RowDeleting" KeyFieldName="id" DataSourceID="services_aded_ds" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <SettingsDataSecurity AllowEdit="false" AllowDelete="true" AllowInsert="false" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowDeleteButton="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="id" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="service_code" Caption="كود الخدمة" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ArabicName" Caption="اسم الخدمة" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="quantity" Caption="الكمية" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<!-- Request History Grid -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" AutoGenerateColumns="false" AutoPostBack="true" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" OnSelectionChanged="ItemsHisroy_SelectionChanged" KeyFieldName="id" DataSourceID="ItemHis">
                <Settings ShowFilterRow="true" ShowHeaderFilterButton="true" />
                <SettingsPager PageSize="6" Mode="ShowPager" NumericButtonCount="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Columns>
                    <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" VisibleIndex="0"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="OrderNo" Caption="رقم طلب الصرف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="FileId" Caption="رقم المريض"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Account" Caption="رقم الحساب"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Date" Caption="التاريخ" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Time" Caption="الوقت" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp2" Caption=" الموظف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp" Caption=" الموظف" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption=" المخزن"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <SettingsDetail ShowDetailRow="true" AllowOnlyOneMasterRowExpanded="true" />
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <Templates>
                    <DetailRow>
                        <dx:BootstrapGridView ID="Detaiiils" runat="server" KeyFieldName="ID" DataSourceID="ItemHisDetails" OnBeforePerformDataSelect="Detaiiils_BeforePerformDataSelect">
                            <Columns>
                                <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Discription" Caption="نوع الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="UNIT" Caption="الوحدة"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Quntity" Caption="الكمية"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Due_Date" Caption="مدة الاحتياج"></dx:BootstrapGridViewDataColumn>
                            </Columns>
                            <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
                        </dx:BootstrapGridView>
                    </DetailRow>
                </Templates>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Confirmation Popup

```html
<!-- Confirmation Popup -->
<dx:BootstrapPopupControl runat="server" ID="PatientType" SettingsBootstrap-Sizing="Large" Width="800" ShowCloseButton="true" Modal="true" HeaderText="تنبية" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
    <SettingsAdaptivity Mode="OnWindowInnerWidth" />
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout ID="BootstrapFormLayout9" runat="server">
                <Items>
                    <dx:BootstrapLayoutGroup ShowCaption="false">
                        <CssClasses GroupContent="bg-light text-dark" />
                        <Items>
                            <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" HorizontalAlign="Right">
                                <ContentCollection>
                                    <dx:ContentControl>
                                        <dx:ASPxLabel ForeColor="Red" Font-Bold="true" Font-Size="Large" Text="هل انت متأكد من حذف طلب الصرف ؟" ID="MSG" runat="server" Width="100%"></dx:ASPxLabel>
                                    </dx:ContentControl>
                                </ContentCollection>
                            </dx:BootstrapLayoutItem>
                            <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                <ContentCollection>
                                    <dx:ContentControl>
                                        <dx:BootstrapButton runat="server" ID="Yes" OnClick="Yes_Click" Width="50%" Text="تأكيد الحذف">
                                            <SettingsBootstrap RenderOption="Success" />
                                        </dx:BootstrapButton>
                                    </dx:ContentControl>
                                </ContentCollection>
                            </dx:BootstrapLayoutItem>
                            <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                <ContentCollection>
                                    <dx:ContentControl>
                                        <dx:BootstrapButton runat="server" ID="No" OnClick="No_Click" Width="50%" Text="إلغاء">
                                            <SettingsBootstrap RenderOption="Danger" />
                                        </dx:BootstrapButton>
                                    </dx:ContentControl>
                                </ContentCollection>
                            </dx:BootstrapLayoutItem>
                        </Items>
                    </dx:BootstrapLayoutGroup>
                </Items>
            </dx:BootstrapFormLayout>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

## Data Flow Architecture

### Query String Parameters

The system uses user context and date parameters for comprehensive data filtering:

**User Context Parameters**:
- `@user` - Username for filtering temporary items and services
- `@date` - Date for filtering temporary records
- `@emp` - Employee code for filtering request history

**Selection Parameters**:
- `@file` - Patient FileId for filtering accounts
- `@store` - Store ID for filtering available items
- `@item_code` - Item code for filtering services
- `@FK_OrderID` - Order ID for filtering request details

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Patient Selection**: Filters accounts based on selected patient
3. **Store Selection**: Filters items based on selected store and availability
4. **Item Selection**: Loads item details and unit information
5. **Service Selection**: Filters services based on item and service type
6. **Item Addition**: Adds items to temporary request with validation
7. **Request Management**: Saves, edits, or deletes complete requests
8. **History Display**: Shows all active requests for user with details

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Sets minimum date for period control
3. Sets current date as default for period
4. Auto-populates department and employee information
5. Disables readonly fields appropriately
6. Sets default order type for patient requests

### Patient_SelectedIndexChanged Method

```csharp
protected void Patient_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Filters accounts based on selected patient

**Process**:
1. Retrieves selected patient FileId
2. Sets parameter for account data source
3. Binds account dropdown with filtered accounts
4. Clears account selection if needed

### Item_SelectedIndexChanged Method

```csharp
protected void Item_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads item details and unit information

**Process**:
1. Retrieves selected item code
2. Loads item type and unit information
3. Sets unit text box with proper unit description
4. Loads available quantity for item
5. Sets default quantity to 1

### BTN_ADD_Click Method

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary request with validation

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates period date is selected
4. Checks item availability in store
5. Validates service selection if required
6. Inserts item into temporary table
7. Refreshes temporary items grid
8. Clears form fields for next addition

### BTN_Save_Click Method

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete request with all items and services

**Process**:
1. Validates at least one item is added
2. Generates new order number
3. Inserts request header record
4. Inserts all temporary items as details
5. Inserts all temporary services
6. Clears temporary tables
7. Refreshes all grids and controls
8. Provides success feedback

### BTN_Delete_Click Method

```csharp
protected void BTN_Delete_Click(object sender, EventArgs e)
```

**Purpose**: Shows confirmation popup for request deletion

**Process**:
1. Validates request selection from history
2. Shows confirmation popup
3. Waits for user confirmation
4. Processes deletion on confirmation

### Yes_Click Method

```csharp
protected void Yes_Click(object sender, EventArgs e)
```

**Purpose**: Confirms and processes request deletion

**Process**:
1. Retrieves selected request ID
2. Updates request status to inactive (Active=0)
3. Clears temporary tables
4. Refreshes all grids and controls
5. Hides confirmation popup
6. Provides success feedback

## Database Integration

### Core Database Tables

#### **Patient_information**
- **Purpose**: Patient master data with file information
- **Key Fields**: FileId, Patient_Name
- **Usage**: Provides patient list for selection
- **Filtering**: Active visits only (Active_Close='A')

#### **VisitAccount**
- **Purpose**: Patient visit and account associations
- **Key Fields**: FileID, AccountNo, Active_Close
- **Usage**: Links patients to their accounts
- **Filtering**: Active visits only (Active_Close='A')

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Store_type
- **Usage**: Provides store list for item selection
- **Filtering**: Active stores with procedure access

#### **storeBalance_withbatch_no**
- **Purpose**: Store inventory balance with batch tracking
- **Key Fields**: item_code, storeid, remain
- **Usage**: Tracks item availability in stores
- **Filtering**: Items with quantity > 0

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with type associations
- **Key Fields**: item_code, arabic_name, Item_Type_id
- **Usage**: Provides item descriptions and types
- **Filtering**: Active items only

#### **Inventories_item_type**
- **Purpose**: Item type master data with dispensing rules
- **Key Fields**: id, english_name, active
- **Usage**: Categorizes items for dispensing workflow
- **Filtering**: Active types with proper dispensing rules

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Request header information with status tracking
- **Key Fields**: id, OrderNo, OrderType, Date, Time, Emp, Active, closed, Status
- **Usage**: Main request tracking and management
- **Filtering**: Active requests (Active=1, closed=0, Status='a')

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Request detail items with quantities and periods
- **Key Fields**: header_fk, item_code, Quntity, Due_Date
- **Usage**: Tracks items in each request
- **Relationships**: Links to request headers

#### **ChargeItem**
- **Purpose**: Service and charge item master data
- **Key Fields**: Code, ArabicName, Item_Service, indicator
- **Usage**: Provides service options for items
- **Filtering**: Active services (Item_Service='S', indicator!='delete')

#### **Inventories_chargeItem_request_temp**
- **Purpose**: Temporary service assignments for requests
- **Key Fields**: id, service_code, quantity, emp_user, date_time
- **Usage**: Tracks services before request save
- **Relationships**: Links to temporary request workflow

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code and department from user profile
**Validation**: Ensures user is authenticated before accessing request operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for request operations

#### **Store Access Control**
```sql
SELECT WS.id as code,arabic_name
FROM Inventories_wharehouse_store WS 
WHERE (WS.active = 1) and WS.id in (select ws.id 
from Inventories_Procedures_Stores_DTL sd  
inner join Inventories_Procedures_Stores_HD sh on sd.Setup_Procedure_Stores_FK =sh.ID  
inner join Inventories_wharehouse_store ws on ws.id = sd.Stores_Code
where sd.Active =1 and sh.Setup_Procedure_FK = 3) and Store_type <> 1
```

**Access Logic**: Filters stores based on procedure access permissions
**Permission Logic**: Only stores with Setup_Procedure_FK=3 are accessible
**Validation**: Ensures store is active and not of restricted type

#### **Item Availability Filtering**
```sql
select distinct Inventories_Item_Settings.arabic_name as arabic_name, storeBalance_withbatch_no.item_code as item_code  
from storeBalance_withbatch_no inner join Inventories_Item_Settings on storeBalance_withbatch_no.item_code=Inventories_Item_Settings.item_code
where (active = 1) and storeid = @store
and Item_Type_id in (SELECT distinct Inventories_item_type.id FROM Inventories_item_type inner join Inventories_Dispens on Inventories_item_type.id = fk_item_type inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id = Inventories_item_type.id where fk_disp_type = 4 and (Inventories_item_type.active = '1') and item_level ='3' and Inventories_rules_items_type.active=1 and Inventories_Dispens.active =1 )
group by Inventories_Item_Settings.arabic_name, storeBalance_withbatch_no.item_code
having (SUM(remain) ) > 0
```

**Availability Logic**: Shows only items with available quantity in selected store
**Type Logic**: Filters items by dispensing type (fk_disp_type=4)
**Level Logic**: Ensures proper item level (item_level='3')

## Client-Side JavaScript

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

### Browser Security

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Security Logic**: Prevents browser back button navigation
**Session Management**: Ensures proper session handling
**User Experience**: Maintains application state and security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Request Header Section**
```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3" BeginRow="true">
        <dx:BootstrapLayoutItem Caption="رقم الحساب" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Store and Item Selection Section**
```html
<!-- Store and Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="المخزن">
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف">
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="كمية الصنف">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Service Integration Section**
```html
<!-- Service Integration -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="">
        <dx:BootstrapLayoutItem ColSpanMd="6" Caption="الخدمة">
        <dx:BootstrapLayoutItem ColSpanMd="12" Visible="false" Caption="عدد تلقي الخدمات">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Operation Buttons Section**
```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutItem ColSpanMd="4" Caption=" ">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left; color: white; background-color: white">
                <dx:BootstrapButton runat="server" Text="  اضافة الصنف" ID="BTN_ADD" OnClick="BTN_ADD_Click" CssClasses-Control="cc">
                <dx:BootstrapButton runat="server" Text="  تعديل الصنف" ID="BTN_Edit_Temp" OnClick="BTN_Edit_Temp_Click" CssClasses-Control="cc">
                <dx:BootstrapButton runat="server" Text=" حذف الصنف " ID="BTN_Delete_Temp" OnClick="BTN_Delete_Temp_Click" CssClasses-Control="cc">
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

#### **5. Data Grids Section**
```html
<!-- Temporary Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="8">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" runat="server" OnSelectionChanged="tempItems_SelectionChanged">
<!-- Services Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="services_aded_grid" runat="server" OnRowDeleting="services_aded_grid_RowDeleting">
<!-- Request History Grid -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" OnSelectionChanged="ItemsHisroy_SelectionChanged">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Patient Data Source
SqlDataSource PatientDS = new SqlDataSource();
PatientDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
PatientDS.SelectCommand = "select distinct Patient_information.FileId,Patient_information.Patient_Name from Patient_information inner join VisitAccount on Patient_information.FileId=VisitAccount.FileID where Active_Close='A'";

// Account Data Source
SqlDataSource AccountDS = new SqlDataSource();
AccountDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
AccountDS.SelectCommand = "select distinct Dep_Name, VisitAccount.AccountNo from VisitAccount inner join Setup_Sheet_Department on Dep_Code = Dep where Active_Close='A' and FileId=@file";

// Store Data Source
SqlDataSource StoreDs = new SqlDataSource();
StoreDs.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoreDs.SelectCommand = "SELECT WS.id as code,arabic_name FROM Inventories_wharehouse_store WS WHERE (WS.active = 1) and WS.id in (select ws.id from Inventories_Procedures_Stores_DTL sd inner join Inventories_Procedures_Stores_HD sh on sd.Setup_Procedure_Stores_FK =sh.ID inner join Inventories_wharehouse_store ws on ws.id = sd.Stores_Code where sd.Active =1 and sh.Setup_Procedure_FK = 3) and Store_type <> 1";

// Item Data Source
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "select distinct Inventories_Item_Settings.arabic_name as arabic_name, storeBalance_withbatch_no.item_code as item_code from storeBalance_withbatch_no inner join Inventories_Item_Settings on storeBalance_withbatch_no.item_code=Inventories_Item_Settings.item_code where (active = 1) and storeid = @store and Item_Type_id in (SELECT distinct Inventories_item_type.id FROM Inventories_item_type inner join Inventories_Dispens on Inventories_item_type.id = fk_item_type inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id = Inventories_item_type.id where fk_disp_type = 4 and (Inventories_item_type.active = '1') and item_level ='3' and Inventories_rules_items_type.active=1 and Inventories_Dispens.active =1 ) group by Inventories_Item_Settings.arabic_name, storeBalance_withbatch_no.item_code having (SUM(remain) ) > 0";

// Temporary Items Data Source
SqlDataSource TempItemsDS = new SqlDataSource();
TempItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
TempItemsDS.SelectCommand = "SELECT Temp.Item_Type_id,Temp.id, IIS.arabic_name,ISett.arabic_name Discription,IIS.item_code, IIS.item_code, Quntity, Due_Date, username, date FROM Inventories_Dispense_Request_Details_Temp Temp inner join Inventories_Item_Settings IIS on IIS.item_code = Temp.item_code inner join Inventories_item_type ISett on ISett.id = Temp.Item_Type_id WHERE username = @user and date =@date and Type=4";

// Request History Data Source
SqlDataSource ItemHis = new SqlDataSource();
ItemHis.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemHis.SelectCommand = "SELECT id, OrderNo, OrderType, Date, Time, (select User_Name from Users where Emp_Code=convert(nvarchar,Emp)) Emp2,Emp, Dep,FileId,Account,(select arabic_name from Inventories_wharehouse_store where id=store_id) as arabic_name FROM Inventories_Dispense_Request_Header where Emp=@emp and Active = 1 and OrderType=4 and closed=0 and Status='a'";
```

## Business Logic and Validation

### Patient and Account Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Patient.Value == "" || Patient.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المريض');", true);
        return;
    }
    else if (Account.Value == "" || Account.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم الحساب');", true);
        return;
    }
    // ... additional validation
}
```

**Patient Logic**: Validates patient selection before item addition
**Account Logic**: Validates account selection for proper patient association
**Error Prevention**: Prevents item addition without proper patient context

### Item Availability Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (store.Value == "" || store.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    else if (Item.Value == "" || Item.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before item selection
**Item Logic**: Validates item selection from available inventory
**Availability Logic**: Ensures items have sufficient quantity in selected store

### Quantity and Period Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Quentity.Text == "" || Quentity.Text == null || Convert.ToInt32(Quentity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (Period.Text == "" || Period.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال مدة الاحتياج');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and greater than 0
**Period Logic**: Validates period date is selected for item need duration
**Error Prevention**: Prevents item addition with invalid quantity or period

### Service Integration Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (withOrWithoutService.Value.ToString() == "1")
    {
        if (service.Value == "" || service.Value == null)
        {
            ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الخدمة');", true);
            return;
        }
    }
    // ... additional validation
}
```

**Service Logic**: Validates service selection when "بخدمة" (with service) is chosen
**Conditional Logic**: Only validates service when service option is selected
**Error Prevention**: Prevents item addition without proper service assignment

### Request Management Validation

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
{
    if (tempItems.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Request Logic**: Validates at least one item is added before saving request
**Empty Logic**: Prevents saving empty requests
**Error Prevention**: Ensures request has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Patient Selection Validation**: Must select patient before adding items
- **Account Selection Validation**: Must select account for patient
- **Store Selection Validation**: Must select store before item selection
- **Item Selection Validation**: Must select item with available quantity
- **Quantity Validation**: Must enter positive quantity values
- **Period Validation**: Must select valid period date
- **Service Validation**: Must select service when required

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Patient Visit Validation**: Ensures patient has active visit records
- **Account Association Validation**: Ensures account belongs to selected patient
- **Store Access Validation**: Ensures user has access to selected store
- **Item Availability Validation**: Ensures items have sufficient quantity
- **Dispensing Type Validation**: Ensures items have proper dispensing rules
- **Service Association Validation**: Ensures services are properly linked to items

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to department data
- **Store Access**: Ensures user has access to selected store
- **Request Access**: Ensures user can access and modify selected requests
- **Service Access**: Ensures user can access and assign services

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Edit Success**: "تم تعديل الصنف" (Item edited successfully)
- **Item Deletion Success**: "تم حذف الصنف" (Item deleted successfully)
- **Request Save Success**: "تم حفظ الطلب" (Request saved successfully)
- **Request Edit Success**: "تم تعديل الطلب" (Request edited successfully)
- **Request Deletion Success**: "تم حذف الطلب" (Request deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary items and request history grids
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Patient Management System**
- **Database Tables**:
  - `Patient_information` - Patient master data with file information
  - `VisitAccount` - Patient visit and account associations
- **Integration Details**:
  - Patient selection from active visit records
  - Account filtering based on patient associations
  - Visit status validation for active visits only
- **Data Flow**:
  - Patient list filtered by active visits (Active_Close='A')
  - Account list filtered by patient FileId
  - Account associations validated for proper patient context

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Warehouse store master data
  - `storeBalance_withbatch_no` - Store inventory balance with batch tracking
  - `Inventories_Item_Settings` - Item master data with type associations
  - `Inventories_item_type` - Item type master data with dispensing rules
- **Integration Details**:
  - Store access controlled by procedure permissions
  - Item availability tracked with batch-level detail
  - Item types filtered by dispensing workflow rules
  - Quantity validation ensures sufficient inventory
- **Data Flow**:
  - Store list filtered by procedure access (Setup_Procedure_FK=3)
  - Item list filtered by store availability and dispensing type
  - Quantity validation prevents over-allocation
  - Item types validated for proper dispensing workflow

#### **Service Management System**
- **Database Tables**:
  - `ChargeItem` - Service and charge item master data
  - `Inventories_chargeItem_request_temp` - Temporary service assignments
- **Integration Details**:
  - Service selection for items requiring services
  - Service validation for active and available services
  - Service quantity tracking for proper allocation
- **Data Flow**:
  - Service list filtered by item associations and active status
  - Service assignments tracked in temporary tables
  - Service validation ensures proper service-item relationships

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
  - **Department Assignment**: Retrieved via SQL query on DefinitionEmployee1 table
- **Database Tables**:
  - `DefinitionDep` table with fields: DepID, Dep_Name
  - `DefinitionEmployee1` table with fields: EmpID, EmpDepartment
  - Connection string: `BackOffice_CS`
- **Permission System**:
  - Department-based access control enforced at database level
  - User authentication required for all request operations
  - Department auto-population based on user profile

### Data Exchange

#### **Patient and Account Information**
- **Database Tables**:
  - `Patient_information` - Patient master data
  - `VisitAccount` - Patient visit and account associations
- **Real-time Data**:
  - Active patient list with file information
  - Account associations for selected patients
  - Visit status validation for active visits
- **Data Relationships**:
  - Patient-account associations for proper request context
  - Visit status filtering for active visits only
  - Account validation for patient associations

#### **Store and Item Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data with access permissions
  - `storeBalance_withbatch_no` - Item availability with batch tracking
  - `Inventories_Item_Settings` - Item master data with type associations
- **Real-time Data**:
  - Store access permissions based on procedure assignments
  - Item availability with quantity tracking
  - Item type associations for dispensing workflow
- **Data Relationships**:
  - Store access controlled by procedure permissions
  - Item availability tracked by store and batch
  - Item types validated for proper dispensing rules

#### **Request and Service Information**
- **Database Tables**:
  - `Inventories_Dispense_Request_Header` - Request header with status tracking
  - `Inventories_Dispense_Request_Details` - Request details with items and quantities
  - `ChargeItem` - Service master data with active status
- **Real-time Data**:
  - Request status and workflow tracking
  - Item quantities and period requirements
  - Service associations for items requiring services
- **Data Relationships**:
  - Request header linked to employee and patient context
  - Request details linked to header with item allocations
  - Service assignments linked to items when required

#### **Temporary Data Management**
- **Database Tables**:
  - `Inventories_Dispense_Request_Details_Temp` - Temporary item assignments
  - `Inventories_chargeItem_request_temp` - Temporary service assignments
- **Real-time Data**:
  - Temporary item assignments before request save
  - Temporary service assignments for service items
  - User and date-based filtering for temporary data
- **Data Relationships**:
  - Temporary items linked to user and date context
  - Temporary services linked to user and date context
  - Temporary data cleared after request save or deletion

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المريض" Error**
- **Cause**: No patient selected before adding items
- **Solution**: Always select patient from dropdown before adding items
- **Prevention**: Patient selection is required for all item additions

#### **"الرجاء اختيار رقم الحساب" Error**
- **Cause**: No account selected for patient
- **Solution**: Select account from dropdown after patient selection
- **Prevention**: Account must be associated with selected patient

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: No store selected before item selection
- **Solution**: Select store from dropdown before selecting items
- **Prevention**: Store must have procedure access for dispensing

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: No item selected or item unavailable
- **Solution**: Select item from available items in selected store
- **Prevention**: Ensure store has items with available quantity

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Enter positive quantity value
- **Prevention**: Quantity must be greater than 0

#### **"الرجاء ادخال مدة الاحتياج" Error**
- **Cause**: Period date not selected
- **Solution**: Select valid period date for item need duration
- **Prevention**: Period must be valid date for all items

#### **"الرجاء اختيار الخدمة" Error**
- **Cause**: Service not selected when "بخدمة" option chosen
- **Solution**: Select service from dropdown when service option is selected
- **Prevention**: Service required for items with service requirement

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to request before saving
- **Solution**: Add at least one item before saving request
- **Prevention**: Request must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Patient Administration Access**: Access to patient administration operations
- **Store Access**: Access to stores with procedure permissions
- **Item Access**: Access to items with proper dispensing rules
- **Service Access**: Access to services for service items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Patient Administration Workflow**: Understanding of patient selection and account associations
- **Inventory Management**: Knowledge of store access and item availability
- **Service Integration**: Familiarity with service selection and assignment
- **Request Management**: Understanding of request save, edit, and delete operations

## Usage Examples

### Basic Patient Request Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Patient Selection**: Select patient from active patient list
3. **Account Selection**: Select appropriate account for patient
4. **Store Selection**: Select store with procedure access
5. **Item Selection**: Select item with available quantity
6. **Item Details**: Enter quantity and period for item
7. **Service Selection**: Optionally select service if required
8. **Item Addition**: Click add button to add item to request
9. **Repeat Items**: Add additional items as needed
10. **Request Save**: Click save button to create complete request

### Service Integration Workflow

1. **Item Selection**: Select item that requires service
2. **Service Option**: Choose "بخدمة" (with service) option
3. **Service Selection**: Select appropriate service from dropdown
4. **Service Quantity**: Enter quantity for service if required
5. **Item Addition**: Add item with service assignment
6. **Service Tracking**: Verify service appears in services grid
7. **Service Management**: Add or remove services as needed

### Request Management Workflow

1. **Request Creation**: Complete patient request with all items
2. **Request Save**: Save request to create header and details
3. **Request History**: Review saved requests in history grid
4. **Request Edit**: Select request and modify items if needed
5. **Request Deletion**: Select request and confirm deletion
6. **Request Tracking**: Monitor request status and workflow

### Item Management Workflow

1. **Item Addition**: Add items to temporary request
2. **Item Review**: Review items in temporary items grid
3. **Item Editing**: Select item and modify quantity or period
4. **Item Deletion**: Remove items from temporary request
5. **Item Validation**: Ensure all items have proper validation
6. **Request Completion**: Save request with all validated items
